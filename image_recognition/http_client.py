import requests

API_ROOT = 'http://localhost:3000'

flightName = 'pyFlight'

# Create flight
payload = {
    'name': flightName,
    'imageDensity': 10
}

print('Creating flight ' + flightName);
r = requests.post(API_ROOT + '/flights', json=payload)
print(r.json())


# Send marker with image

print('Adding markers to flight', flightName)

for i in range(1, 10):
    payload = {
        'lat': 0,
        'lng': 0,
        'image': 'images ({}).jpg'.format(i),
        'trashDetected': False
    }
    files = {
        'file': open('./unorganized_images/whole_cans/images ({}).jpg'.format(i), 'rb')
    }
    r = requests.post(API_ROOT + '/flights/' + flightName, files=files, data=payload)
    print(r.json())
