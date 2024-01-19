Abstract:
In the following steps you will be creating an OAuth Account with Google Cloud, which is a cloud based service that handles POST/GET requests. Furthermore, it will be used for generating credentials for registering users both Students and Instructors on your local machine.

Installation Steps:

1. Open a new internet browsers and navigate to Google Cloud at the following Link: https://console.cloud.google.com/

<br>

2. Login into your gmail account by navigating to the login option, which will be top right of the screen.

<br>

![Login into your gmail account by navigating to the login option, which will be top right of the screen.](<../../../../readme_resources/google_could_login.png>)

3. Click "Select Project" on the top left of the google cloud console

<br>

![Click "Select Project" on the top left of the google cloud console](<../../../../readme_resources/Select_Project_Button.png>)

4. Click "Create New Project" in the top right of the screen

<br>

![Click "Create New Project" in the top right of the screen](<../../../../readme_resources/Create_New_Project_Button.png>)

5. Name your project, by filling in the Project Name field. Do not enter an organization, it is uneeded. Press the "Create" button when you are finished.

<br>

![Name your project, by filling in the Project Name field. Do not enter an orginization, it is uneeded. Press the "Create" button when you are finished.](<../../../../readme_resources/Create_New_Project_Screen.png>)

6. Select your new project by pressing the "Select Project" button, and click on the project name of the project you just created.

<br>

![Select your new project by pressing the "Select Project" button, and click on the project name of the project you just created.](<../../../../readme_resources/Select_Created_Project.png>)

7. Once your project is finished loading, click the "API & Services" Button under the quick access menu

<br>

![Once your project is finished loading, click the "API & Services" Button under the quick access menu](<../../../../readme_resources/API_Services_Button.png>)

8. Navigate to the "OAuth consent screen" tab and by pressing the button

<br>

![Navigate to the "OAuth consent screen" tab and by pressing the button](<../../../../readme_resources/OAuth_Consent_Navigation.png>)

9. You will be prompted to select a user type, for this project make sure to toggle "External" and press the "Create" buttons

<br>

![You will be prompted to select a user type, for this project make sure to toggle "External" and press the "Create" button](<../../../../readme_resources/OAuth_Consent_User_Type.png>)

10. Fill in the "App Name" field with your desired application name. Under the "User support email, supply the gmail account you are presently logged into.

<br>

![Fill in the "App Name" field with your desired application name. Under the "User support email, supply the gmail account you are presently logged into.](<../../../../readme_resources/OAuth_Consent_Screen_Set_up.png>)

11. Scroll to the bottom of the page and fill in the field "Developer contact information" with the same email you are presently logged into. Press "Save and Continue" when finished.

<br>

![Scroll to the bottom of the page and fill in the field "Developer contact information" with the same email you are presently logged into. Press "Save and Continue" when finished.](<../../../../readme_resources/OAuth_Consent_Screen_Set_up_1.png>)

12. Press "Add or Remove" Scopes, and in the "Manually add scopes field" enter 'https://mail.google.com/', which NodeMailer is dependent on. Press "Add to table" and then "Update". Press "Save and Continue" on the bottom of the screen when finished.

<br>

![Press "Add or Remove" Scopes, and in the "Manually add scopes field" enter 'https://mail.google.com/', which NodeMailer is dependent on. Press "Add to table" and then "Update". Press "Save and Continue" on the bottom of the screen when finished.](<../../../../readme_resources/OAuth_Consent_Scopes_Set_up.png>)

<br>

13. Press "Add User" under the heading "Test Users" and add the email you are presently logged into. Once you have filled out this field, press the "Add" button once finished. Press "Save and Continue" when you are ready.

<br>

![Press "Add User" under the heading "Test Users" and add the email you are presently logged into. Once you have filled out this field, press the "Add" button once finished. Press "Save and Continue" when you are ready.](<../../../../readme_resources/OAuth_Consent_Test_User_Set_up.png>)

14. Review the consent screen, and when you are ready press "Back to Dashboard"

<br>

![Review the consent screen, and when you are ready press "Back to Dashboard"](<../../../../readme_resources/OAuth_Consent_Reviw_Consent_Set_up.png>)

## OAuth ClientID

1. Congratulations! In the previous section you created a "consent" for your google cloud project. Please remain in the same project for the following steps:

<br>

2. Navigate to the "Credentials" tab and press its button. Here you press "Create Credentials", and then press "OAuth Client ID". You will need to create this Credential to gather you  authorization tokens in a future step.

<br>

![Navigate to the "Credentials" tab and press its button. Here you press "Create Credentials", and then press "OAuth Client ID". You will need to create this Credential to gather you  authorization tokens in a future step.](<../../../../readme_resources/OAuth_Consent_Credentials_Client_ID.png>)

3. Under "Application Type" select "Web Application" and under the "Name" field give the name "Web Application 1" or any other name you desire.

<br>

![Under "Application Type" select "Web Application" and under the "Name" field give the name "Web Application 1" or any other name you desire.](<../../../../readme_resources/OAuth_Consent_Credentials_Client_ID_1.png>)

4. Scroll down to the heading "Authorized redirect URIs" and press the "ADD URI" Button. In the new "URIs 1" field, type in 'http://localhost:3001/oauth2callback' and press the "Create" button promptly after.

<br>

![Scroll down to the heading "Authorized redirect URIs" and press the "ADD URI" Button. In the new "URIs 1" field, type in 'http://localhost:3001/oauth2callback' and press the "Create" button promptly after.](<../../../../readme_resources/OAuth_Consent_Credentials_Client_ID_2.png>)

5. Review your created "Web Client" Client. Take note of "Client ID" and "Client Secret". NOTE: Keep these fields private AND never share them with anyone. "Keep it secret, Keep it safe"

<br>

![Review your created "Web Client" Client. Take note of "Client ID" and "Client Secret". NOTE: Keep these fields private AND never share them with anyone. "Keep it secret, Keep it safe."](<../../../../readme_resources/OAuth_Consent_Credentials_Client_ID_3.png>)

6. The next few steps will detail how to create an "authorization URL", which is the essential piece to "Obtaining a Authorization Code". The next few steps are a bit tricky, I suggest you have a notepad open to take notes and save data.

7. To create an authorization URL, you will need to follow the below format (clarified in steps 8 - 12 below). Don't worry we will do a step by step instruction on how to acomplish this. The URL format is as follows:

```
https://accounts.google.com/o/oauth2/v2/auth?
scope=[SCOPES]&
access_type=offline&
include_granted_scopes=true&
response_type=code&
state=[STATE]&
redirect_uri=[REDIRECT_URI]&
client_id=[CLIENT_ID]

```
Note: Remove the "[]"'s (Square Brackets) note that in the above example that the entire URL should be on the same line. In the above example, the line breaks are for ease of reading. Make sure not to delete the "&"'s following each field. Also note that the entire URL starting from 'https' to and including the 'client_id' field are all part of the 'authorization url'.

8. Set 'scope' equal to 'https://mail.google.com/' like this screen shot.

<br>

![Set 'scope' equal to 'https://mail.google.com/' like so.](<../../../../readme_resources/Authorization_URL_Scope.png>)

9. Set 'state' equal to your current state code like so:

<br>
  
![Set 'state' equal to your current state code like so:](<../../../../readme_resources/Authorization_URL_State.png>)

10. Set 'redirect_uri' equal to 'http://localhost:3001/oauth2callback' like so:

<br>

![Set 'redirect_uri' equal to 'http://localhost:3001/oauth2callback' like so:](<../../../../readme_resources/Authorization_URL_Redirect_URI.png>)

11. Set 'client_id' equal to your Client ID, which you can find under your web client you created in Step 5. See Step 6 in the previous section for more assitance. Note: Remember to not share your 'Client ID' with anyone!

<br>

![Set 'client_id' equal to your Client ID, which you can find under your web client you created in Step 5. See Step 6 in the previoussection for more assitance. Note: Remember to not share your 'Client ID' with anyone!](<../../../../readme_resources/Authorization_URL_Client_ID.png>)

12. Your URL will look something like this now. Note: I have blocked out my client ID for security reasons.

<br>

![Your URL will look something like this now. Note: I have blocked out my client ID for security reasons.](<../../../../readme_resources/Authorization_URL_Finished_Example.png>)

13. Enter your new 'Authorization URL', which you just created in the above steps 7 - 12, into an internet browser of your choice like so:

<br>

![Enter your new 'Authorization URL' into an internet browser of your choice like so.](<../../../../readme_resources/Authorization_URL_Browser_Insertion.png>)

14. You will be prompted to log into your gmail account for google cloud. Make sure to use the email you are logged into your google cloud for. You may be warned that the app is not verified, press 'Continue' and ignore this prompt.

<br>

![You will be prompted to log into your gmail account for google cloud. Make sure to use the email you are logged into your google cloud for. You may be warned thast the app is not verified, press "Continue" and ignore this prompt. ](<../../../../readme_resources/Authorization_URL_Browser_Log_In.png>)

15. Now you will be greeted with a new web page, with a 'Message' that equals 'This is OAuth Callback endpoint'. Look at the URL, and take note of the code. This is important to save or write down in a notepad, because this is the 'authorization code' for your web client. Note: DO NOT LOSE THIS AUTHORIZATION CODE

Note: Your 'authorization code' is everything after 'code=' up to but not including the '&scope'.

<br>

![Now you will be greeted with a new web page, with a 'Message' that equals 'This is OAuth Callback endpoint'. Look at the URL, and take note of the code. This is important to save or write down in a notepad, because this is the 'authorization code' for your web client. Note: DO NOT LOSE THIS AUTHORIZATION CODE](<../../../../readme_resources/Authorization_URL_Browser_Code_Acquisition.png>)

16. Now that we have our 'authorization' code its time to focus on generating our 'refresh token'. The next few steps will detail how to generate a refresh token.

17. In your IDE, install the 'Thunder Client' extension. NOTE: you can use Postman as well, but this tutorial will focus on Thunder Client.

<br>

![In your IDE, install the 'Thunder Client' extension. NOTE: you can use Postman as well, but this tutorial will focus on Thunder Client.](<../../../../readme_resources/Thunder_Client_Extension_Installation.png>)

18. Open the 'Thunder Client' application in your IDE, this can be found on the left handside of your editor (Refer to the Lightning Bolt Symbol). Press 'New Request', and use the dropdown menu to select 'POST'. Navigate to the 'Body' section of this request.

<br>

![Open the 'Thunder Client' application in your IDE, this can be found on the left handside of your editor (Refer to the Lightning Bolt Symbol). Press 'New Request', and use the dropdown menu to select 'POST'. Navigate to the 'Body' section of this request.](<../../../../readme_resources/Thunder_Client_Extension_Post.png>)

19. Fill in the JSON based 'POST' Request like the screenshot. Your 'POST' Request should follow this format:

<br>

```

{
    "code": your_authorization_code_here_from_step_15,
    "client_id": your_client_id_here_from_step_5,
    "client_secret": your_client_secret_here_from_step_5,
    "redirect_uri": "http://localhost:3001/oauth2callback",
    "grant_type": "authorization_code"
}

```

<br>

![Fill in the JSON based 'POST' Request like the screenshot and the below format](<../../../../readme_resources/Thunder_Client_Extension_Post_1.png>)

20. Replace the current link inside the 'POST' request, and instead enter 'https://oauth2.googleapis.com/token' and press 'Send':

<br>

![Replace the current link inside the 'POST' request, and instead enter 'https://oauth2.googleapis.com/token' and press 'Send'](<../../../../readme_resources/Thunder_Client_Extension_Post_2.png>)

21. You will Receive a message back with the fields "access_token", "expires_in", "refresh_token","scope", and "token_type". Below is an explanation:

<br>

![You will Receive a message back with the fields "access_token", "expires_in", "refresh_token","scope", and "token_type". Below is an explanation:](<../../../../readme_resources/Thunder_Client_Extension_Post_3.png>)

```

access_token: This is the token, that you will need to access the user API functionality. Make sure you keep this token saved in a notepad.

expires_in: This is the time it takes for a token to expire. This means that the access token will expire in 3599 seconds (aka almost an hour).

refresh_token: This token will be used to get a new access token when your access token expires. More on this later in the guide.

scope: This token is a list of scopes you provided in step 6. 

token_type: This just states what type of token the present token is. 

```
Note: If for any reason you run into an error that states 'invalid_grant', please recreate your 'Authorization URL' starting from step 7 up to step 15. Generally the reason this error occurs is because the time has elapsed for that specific 'Authorization URL', which forces you to start over with a new one.

22. Congratulations and pat yourself on the back! You just did the hardest part of the set up.