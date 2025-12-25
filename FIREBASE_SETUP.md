# Firebase Setup Guide for D-Day Tracker

Follow these steps to enable real Google Login for your application.

## Step 1: Create a Firebase Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** (or "Create a project").
3.  Name your project (e.g., `d-day-tracker`) and click **Continue**.
4.  (Optional) Disable Google Analytics for this project (simpler setup) and click **Create project**.
5.  Wait for it to be ready and click **Continue**.

## Step 2: Register Your Web App
1.  In your project dashboard, click the **Web icon** (`</>`) to add an app.
2.  Name it (e.g., `D-Day Web`) and click **Register app**.
3.  **COPY** the `firebaseConfig` object shown on the screen (or keep this tab open). You will need these keys for Step 4.

## Step 3: Enable Google Authentication
1.  In the left sidebar, click **Build** > **Authentication**.
2.  Click **Get started**.
3.  Select the **Sign-in method** tab.
4.  Click on **Google**.
5.  Toggle the **Enable** switch to "On".
6.  Select a **Project support email** from the dropdown.
7.  Click **Save**.

## Step 4: Add Keys to Your Project
1.  In your code editor, open the file named `.env.local.example`.
2.  Rename it to `.env.local` (remove the `.example` extension). or create a new file named `.env.local`.
3.  Fill in the values from the config you copied in Step 2:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456...
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456...
```

## Step 5: Restart the App
1.  Stop the running server in your terminal (Ctrl+C).
2.  Run `npm run dev` again.
3.  Reload the browser page.

**Done!** The "Login" button should now open a real Google Sign-In popup.
