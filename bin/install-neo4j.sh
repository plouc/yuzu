#!/bin/sh


if [ -d neo4j ]; then
    echo "found local neo4j"
else
    echo "no local neo4j found"

    if [ ! -f neo4j.tar.gz ]; then
        echo "no download found, downloading neo4j…"
        curl -O http://neo4j.com/artifact.php?name=neo4j-community-2.1.5-unix.tar.gz > neo4j.tar.gz
    fi

    echo "unpacking neo4j download…"
    mkdir neo4j && tar zxvf neo4j.tar.gz -C neo4j --strip-components 1

    rm neo4j.tar.gz
fi