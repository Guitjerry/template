package com.csair.util;

import java.util.List;

/**
 * Created by dnys on 2016/11/16.
 */
public class QueryResult<T> {

    private List<T> results;

    private long count;

    public QueryResult(List<T> results, long count) {
        super();
        this.results = results;
        this.count = count;
    }


    public List<T> getResults() {
        return results;
    }
    public void setResults(List<T> results) {
        this.results = results;
    }

    public long getCount() {
        return count;
    }
    public void setCount(long count) {
        this.count = count;
    }
}
