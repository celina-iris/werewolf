package edu.dlsu.mobapde.werewolf.adapter;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

import edu.dlsu.mobapde.werewolf.R;
import edu.dlsu.mobapde.werewolf.entity.Player;

/**
 * Created by ruby on 11/14/2017.
 */

public class PlayerAdapter
        extends RecyclerView.Adapter<PlayerAdapter.PlayerViewHolder>{

    ArrayList<Player> data;

    public PlayerAdapter(ArrayList<Player> data){
        this.data = data;
    }

    @Override
    public PlayerViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.recycler_buttons, parent, false);
        return new PlayerViewHolder(v);
    }

    @Override
    public void onBindViewHolder(PlayerViewHolder holder, int position) {
        //we put in the data at this position
        final Player currentPlayer = data.get(position);
        holder.bPlayerName.setText(currentPlayer.getName());
        holder.bPlayerName.setTag(currentPlayer);

        holder.bPlayerName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Player p = (Player) view.getTag();
//                Toast.makeText(view.getContext(),
//                        "Clicked on " + r.getName(),
//                        Toast.LENGTH_SHORT).show();
                onItemClickListener.onItemClick(p);
            }
        });
    }

    @Override
    public int getItemCount() {
        return data.size(); //for header shiz +1
    }

    public class PlayerViewHolder
            extends RecyclerView.ViewHolder{
        Button bPlayerName;

        public PlayerViewHolder(View itemView){
            super(itemView);
            bPlayerName = itemView.findViewById(R.id.b_button);
        }
    }

    public interface OnItemClickListener {
        public void onItemClick(Player p);
    }

    private OnItemClickListener onItemClickListener; //variable

    public void setOnItemClickListener(OnItemClickListener onItemClickListener){
        this.onItemClickListener = onItemClickListener;
    }
}

