#!/bin/bash

dynamodb_container_name="dynamodb-local"

usage() {
    echo "Uso: $0 {start|stop|run}"
    echo "\nOpções:"
    echo "  create-dynamo - Cria o contêiner com um nome fixo ($dynamodb_container_name)"
    echo "  stop  - Para o contêiner sem removê-lo"
    echo "  start - Reinicia o contêiner existente"
    echo "  create - Cria a tabela Customers"
    echo "  list - Lista as tabelas criada"
}

if [ "$#" -ne 1 ]; then
    usage
fi

case "$1" in
    create-dynamo)
        echo "Cria o contêiner $dynamodb_container_name"
        docker run -d --name "$dynamodb_container_name" -p 8000:8000 amazon/dynamodb-local
        ;;
    stop)
        echo "Parando o contêiner $dynamodb_container_name"
        docker stop "$dynamodb_container_name"
        ;;
    start)
        echo "Reiniciando o contêiner $dynamodb_container_name"
        docker start "$dynamodb_container_name"
        ;;
    create)
        echo "Criando a tabela Customers"
        aws dynamodb create-table --table-name Customers --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url http://localhost:8000
        ;;
    list)
        echo "Listando as tabelas"
        aws dynamodb list-tables --endpoint-url http://localhost:8000
        ;;
    *)
        usage
        ;;
esac

read -p "Pressione Enter para sair..."