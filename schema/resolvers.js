const {UserList,MovieList} = require("../FakeData");
const _ = require("lodash");
const resolvers = {
    Query: {

        //User resolvers:
        users: ()=> {
            return UserList;
        },
        user: (parent,args)=> {
            const id=args.id;
            const user = _.find(UserList, {id:Number(id)});
            return user
        },
        // Movie Resolvers: 
        movies: ()=> {
            return MovieList;

        },
        movie:(parent,args) => {
            const name= args.name
           const movie= _.find(MovieList,{name} );
           return movie;
        }
    },
    User: {
        favoriteMovies: () => {
            return _.filter(MovieList,(movie)=>movie.yearOfPublication >=2000 
                && 
                movie.yearOfPublication <= 2010);
        }
    },

    Mutation : {
        createUser: (parent, args) => {
            const user = args.input;
            console.log(user);
            const lastId = UserList[UserList.length-1].id;
            user.id=lastId +1;
            UserList.push(user);
            return user;
        },

        updateUsername: (parent, args) => {
            const userInput = args.input;
            let updatedUser;
            const user = UserList.find(user => (user.id == userInput.id));
            updatedUser=user;
            updatedUser.username=userInput.newUsername;
            return updatedUser;

            //Or use the logic 

        // const { id, newUsername } = args.input;
        // let user;
        // UserList.forEach((user) => {
        //   if (user.id === Number(id)) {
        //     user.username = newUsername;
        //     userUpdated = user;
        //   }
        // });
        // return userUpdated;
      }, 
      deleteUser: (parent,args)=> {
        const id = args.id;
        const userIndex = UserList.findIndex(user => (user.id == id));
        const deletedUser=UserList.splice(userIndex,1)[0];
        return `Deleted the user with username: ${deletedUser.username}`;

        //Alternative option to remove the user using loaddash :
        // _.remove(UserList, (user)=>(user.id === Number(id)));


      }
            
        

    }

}


module.exports = {resolvers};