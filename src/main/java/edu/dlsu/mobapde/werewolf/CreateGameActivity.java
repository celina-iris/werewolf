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

public class CreateGameActivity extends AppCompatActivity {

    private Button btCreateGame, btCancel;

    private FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_game);

        btCreateGame = (Button) findViewById(R.id.b_create_game);
        btCancel = (Button) findViewById(R.id.b_cancel);

        auth = FirebaseAuth.getInstance();

        btCreateGame.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), WaitingPlayersActivity.class);
                //WHAT HAPPENS AFTER CREATE? JOIN GAME OR WAITING FOR PLAYERS NA? !!!!!!!!!!!!
                startActivity(i);
            }
        });

        btCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), MainMenu.class);
                startActivity(i);
            }
        });
    }
}
