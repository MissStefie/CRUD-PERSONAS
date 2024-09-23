#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 3306; do
  >&2 echo "Esperando a que la base de datos esté disponible..."
  sleep 1
done

>&2 echo "La base de datos está disponible, ejecutando el comando..."
exec $cmd
