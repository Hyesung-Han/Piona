package com.bloom;

// Splash를 새로 생성하면 하단의 (220425) 3부분이 중복되서 생기므로 다 지워주면 됨
// import 부분은 그대로 똑같이 생성되니까 지워주면 되고
// MainActivity 안에는 약간 다른데 필요없으니까 지워주면됨! (다르다고 당황 X)

import android.os.Bundle;                       // Splash Page 구현(220425)
import org.devio.rn.splashscreen.SplashScreen;  // Splash Page 구현(220425)

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

public class MainActivity extends ReactActivity {
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);                // Splash Page 구현(220425)
        super.onCreate(savedInstanceState);
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "bloom";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
