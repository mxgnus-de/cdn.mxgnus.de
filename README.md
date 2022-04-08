# Simple file upload implemented in Go and React.

# Installation:

## Prepare the Go app

```bash
git clone https://github.com/mxgnus-de/simple-file-upload.git && cd simple-file-upload
go mod download
go build -o server
```

### Rename `.env.example` to `.env` and fill in the values.

## Prepare the React app

```bash
cd react-app
npm install
npm run build
cd ..
```

### Run the server

```bash
./server
```
