package edu.dlsu.mobapde.werewolf.entity;

/**
 * Created by ruby on 11/14/2017.
 */

public class Game {

    private String name;

    public Game(){

    }

    public Game(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
