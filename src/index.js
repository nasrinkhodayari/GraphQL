const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}, {
  id: 'link-1',
  url: 'www.ql.com',
  description: 'Fullstack tutorial for QL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      const link =  links.find(link => link.id === args.id)
      return link;
    }
  },
  Mutation: {
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      let updatedLink;

      links = links.map(link => {
        if (link.id === args.id) {
          updatedLink = { ...link, ...args };
          return updatedLink;
        }
        return link;
      });

      return updatedLink;
   },
   deleteLink:(parent,args)=>{
    const removeIndex = links.findIndex(item => item.id === args.id);
    const removedLink = links[removeIndex];
    links.splice(removeIndex, 1);

    return removedLink;
   }

  }
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
