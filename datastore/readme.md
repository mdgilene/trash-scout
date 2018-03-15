# Trash Scout: Datastore


## TESTING: Post marker data to database
curl -X POST -F "lat=0" -F "lng=0" -F "image=image1.jpg" -F "trashDetected=true" -F imageData=@./resources/image1.jpg" http://localhost:3000/flights/flight