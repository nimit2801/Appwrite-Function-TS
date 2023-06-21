import * as sdk from 'node-appwrite';

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req: any, res: any) {
  const client = new sdk.Client();
  try {
    if (
      !req.variables['APPWRITE_FUNCTION_ENDPOINT'] &&
      !req.variables['APPWRITE_FUNCTION_API_KEY']
    ) {
      console.log(
        'Environment variables are not set. Function cannot use Appwrite SDK.'
      );
    } else {
      console.log("We've the credentials let's load client");

      client
        .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
        .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
        .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
        .setSelfSigned(true);
    }

    res.json({
      areDevelopersAwesome: true,
    });
  } catch (error: any) {
    console.log(error.toSting());
    res.json({
      areDevelopersAwesome: false,
    });
  }
};
