package com.grillo.earthquakeapp;
import android.content.Intent;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this); 
        super.onCreate(savedInstanceState);
    }

    @Override
    protected String getMainComponentName() {
        return "Grillo";
    }
}
