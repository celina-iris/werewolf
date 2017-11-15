package edu.dlsu.mobapde.werewolf;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;

import java.util.ArrayList;

import edu.dlsu.mobapde.werewolf.adapter.GameAdapter;
import edu.dlsu.mobapde.werewolf.entity.Game;

/**
 * Created by ruby on 11/15/2017.
 */

public class JoinGameActivity extends AppCompatActivity {
    RecyclerView btGameName;
    Button btCancel;

    private FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join_game);

        btGameName = (RecyclerView) findViewById(R.id.b_game_name);
        btCancel = (Button) findViewById(R.id.b_cancel);

        ArrayList<Game> games = new ArrayList<>();
        games.add(new Game("LSCS w"));
        games.add(new Game("Meow"));

        GameAdapter ra = new GameAdapter(games);
        ra.setOnItemClickListener(new GameAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(Game g) {
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), WaitingPlayersActivity.class);
                startActivity(i);
                /*Toast.makeText(getBaseContext(),
                        "Clicked on " + g.getName(),
                        Toast.LENGTH_SHORT).show();*/
            }
            //TOAST FOR NOW!!!!
        });


        btGameName.setAdapter(ra);
        btGameName.setLayoutManager(new LinearLayoutManager(
                getBaseContext(), LinearLayoutManager.VERTICAL, false
        ));

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
