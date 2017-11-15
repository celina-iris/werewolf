package edu.dlsu.mobapde.werewolf;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.google.firebase.auth.FirebaseAuth;

/**
 * Created by ruby on 11/15/2017.
 */

public class WaitingPlayersActivity extends AppCompatActivity {

    private Button btStart;

    private FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_waiting_players);

        btStart = (Button) findViewById(R.id.b_start);

        btStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), RoleActivity.class);
                startActivity(i);
            }
        });
    }
}
