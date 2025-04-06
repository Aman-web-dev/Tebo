import User from '../model/userModel.js'

export const findAllUser = async () => {
  const users = await User.find();
  return users;
};

export const createUser = async (userObj) => {
  const response = User.create(userObj);
  return response;
};

export const findUserByIdentifier=async(identifier)=>{
   const user = await User.findOne({
      $or:[{username:identifier},{email:identifier}]
   })
   return user;
}
