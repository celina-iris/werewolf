package edu.dlsu.mobapde.werewolf;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class MainMenu extends AppCompatActivity {

    private Button btLogout, btCreate, btJoin;

    private FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu);

        btCreate = (Button) findViewById(R.id.create_game);
        btJoin = (Button) findViewById(R.id.join_game);
        btLogout = (Button) findViewById(R.id.logout);

        auth = FirebaseAuth.getInstance();

        btCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), CreateGameActivity.class);
                startActivity(i);
            }
        });

        btJoin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), JoinGameActivity.class);
                startActivity(i);
            }
        });

        btLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FirebaseAuth.getInstance().signOut();
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), LoginActivity.class);
                startActivity(i);
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        //check if there is user signed in
        FirebaseUser currentUser = auth.getCurrentUser();

        if(currentUser == null) {
            // go to login page
            Intent i = new Intent();
            //instruct the intent
            i.setClass(getBaseContext(), LoginActivity.class);
            startActivity(i);
        }
    }
}
