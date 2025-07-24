echo $'\n requesting all tasks'
curl localhost:3000/tasks

echo $'\n\n requesting task with id 1'
curl localhost:3000/tasks/1

echo $'\n\n requesting task with wrong body'
curl --silent -X POST --data-binary '{"invalid": "data"}' localhost:3000/tasks

echo $'\n\n creating task'
CREATE=$(curl --silent -X POST --data-binary '{"title": "breakfast", "description":"eat more"}' localhost:3000/tasks)
echo $CREATE

echo $'\n\n last id of created task'
ID=$(echo $CREATE | grep -o '"id":[0-9]*' | sed 's/\"id\"://')
echo $ID

echo $'\n\n requesting task with last id'
curl localhost:3000/tasks/$ID