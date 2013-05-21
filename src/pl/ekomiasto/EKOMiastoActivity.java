package pl.ekomiasto;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class EKOMiastoActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
        	super.setIntegerProperty("splashscreen", R.drawable.splash);
        	super.loadUrl("file:///android_asset/www/index.html", 100000);
        	   
        }     
        catch(Exception e) {}    
    }              
}                                                                                                                                                                                                                                                