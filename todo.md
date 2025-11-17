/auth/register - should return proper error messager instead of actual db error
/auth/register - should not return any kind of mongodb id
ALL - add request validator for each API endpoint like JOI.


/auth/sign_in - instead of response token in message it should be sent in headers so that browser will itself send that token to all next requests.
/auth/user_profile - it should be GET instead of POST Add user_id as query params 

