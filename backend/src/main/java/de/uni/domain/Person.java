package de.uni.domain;

import java.util.ArrayList;
import java.util.List;

public class Person {

    private String name;
    private List<Item> items = new ArrayList<>();

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        Person person = (Person) o;
        return person.getName().equals(name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
