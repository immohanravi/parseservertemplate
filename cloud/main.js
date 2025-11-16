Parse.Cloud.onLiveQueryEvent(({
    event,
    client,
    sessionToken,
    useMasterKey,
    installationId,
    clients,
    subscriptions,
    error
}) => {
    if (event === 'ws_disconnect') {        
        
    }
});

Parse.Cloud.define("sample", async (request) => {
    // const username = request.params.username;
  
    // const userQuery = new Parse.Query(Parse.User);
    // userQuery.equalTo("username", username);
    // const user = await userQuery.first({ useMasterKey: true });
  
    // if (!user) {
    //   //throw new Error("User not found");
    //   return `user not found`
    // }
  
    // const sessionQuery = new Parse.Query("_Session");
    // sessionQuery.equalTo("user", user);
    // const sessions = await sessionQuery.find({ useMasterKey: true });
  
    // for (const session of sessions) {
    //   await session.destroy({ useMasterKey: true });
    // }
  
    // return `${username} logged out from all devices`;
  });