exports.sanitizeUser=(user)=>{
    return {_id:user._id,email:user.email,isVerified:user.isVerified,isAdmin:user.isAdmin}
}