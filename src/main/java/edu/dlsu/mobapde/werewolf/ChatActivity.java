package edu.dlsu.mobapde.werewolf;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;

import com.google.firebase.auth.FirebaseAuth;

/**
 * Created by ruby on 11/15/2017.
 */

public class ChatActivity extends AppCompatActivity {

    private ImageView ivTime, ivAction;

    private FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        //ivTime = (ImageView) findViewById(R.id.iv_time);
        ivAction = (ImageView) findViewById(R.id.iv_action);

        auth = FirebaseAuth.getInstance();

        ivAction.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), ActionActivity.class);
                startActivity(i);
            }
        });

    }
}
