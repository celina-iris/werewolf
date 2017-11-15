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
import edu.dlsu.mobapde.werewolf.entity.Game;

/**
 * Created by ruby on 11/14/2017.
 */

public class GameAdapter
    extends RecyclerView.Adapter<GameAdapter.GameViewHolder>{

    ArrayList<Game> data;

    public GameAdapter(ArrayList<Game> data){
        this.data = data;
    }

    @Override
    public GameViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.recycler_buttons, parent, false);
        return new GameViewHolder(v);
    }

    @Override
    public void onBindViewHolder(GameViewHolder holder, int position) {
        //we put in the data at this position
        final Game currentGame = data.get(position);
        holder.bGameName.setText(currentGame.getName());
        holder.bGameName.setTag(currentGame);

        holder.bGameName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Game g = (Game) view.getTag();
//                Toast.makeText(view.getContext(),
//                        "Clicked on " + r.getName(),
//                        Toast.LENGTH_SHORT).show();
                onItemClickListener.onItemClick(g);
            }
        });
    }

    @Override
    public int getItemCount() {
        return data.size(); //for header shiz +1
    }

    public class GameViewHolder
            extends RecyclerView.ViewHolder{
        Button bGameName;

        public GameViewHolder(View itemView){
            super(itemView);
            bGameName = itemView.findViewById(R.id.b_button);
        }
    }

    public interface OnItemClickListener {
        public void onItemClick(Game g);
    }

    private OnItemClickListener onItemClickListener; //variable

    public void setOnItemClickListener(OnItemClickListener onItemClickListener){
        this.onItemClickListener = onItemClickListener;
    }
}
