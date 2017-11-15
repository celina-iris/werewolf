package edu.dlsu.mobapde.werewolf;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import java.util.ArrayList;

import edu.dlsu.mobapde.werewolf.adapter.PlayerAdapter;
import edu.dlsu.mobapde.werewolf.entity.Player;

/**
 * Created by ruby on 11/15/2017.
 */

public class ActionActivity extends AppCompatActivity {
    RecyclerView bPlayerName;
    ImageView ivChat;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activty_action);

        bPlayerName = (RecyclerView) findViewById(R.id.b_player_name);
        ivChat = (ImageView) findViewById(R.id.iv_chat);

        final ArrayList<Player> players = new ArrayList<>();
        players.add(new Player("Jilyan"));
        players.add(new Player("Celina"));
        players.add(new Player("Vincent"));

        PlayerAdapter ra = new PlayerAdapter(players);
        ra.setOnItemClickListener(new PlayerAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(Player p) {
                Toast.makeText(getBaseContext(),
                        "Clicked on " + p.getName(),
                        Toast.LENGTH_SHORT).show();
            }
        });


        bPlayerName.setAdapter(ra);
        bPlayerName.setLayoutManager(new LinearLayoutManager(
                getBaseContext(), LinearLayoutManager.VERTICAL, false
        ));

        ivChat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // go to login page
                Intent i = new Intent();
                //instruct the intent
                i.setClass(getBaseContext(), ChatActivity.class);
                startActivity(i);
                overridePendingTransition(R.anim.left_to_right, R.anim.right_to_left);
            }
        });
    }
}
