curl -X POST -H 'Content-Type: application/json' -d '{"email": "lorraine@hillvalley.edu", "phoneNumber": "123456"}' http://0.0.0.0:80/identify | jq
curl -X POST -H 'Content-Type: application/json' -d '{"email": "mcfly@hillvalley.edu", "phoneNumber": "123456"}' http://0.0.0.0:80/identify | jq

curl -X POST -H 'Content-Type: application/json' -d '{"email": "george@hillvalley.edu", "phoneNumber": "919191"}' http://0.0.0.0:80/identify | jq
curl -X POST -H 'Content-Type: application/json' -d '{"email": "biffsucks@hillvalley.edu", "phoneNumber": "717171"}' http://0.0.0.0:80/identify | jq

curl -X POST -H 'Content-Type: application/json' -d '{"email": "george@hillvalley.edu", "phoneNumber": "717171"}' http://0.0.0.0:80/identify | jq
