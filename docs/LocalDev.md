# Setup Local Environment

### 0. make sure you have go installed
``` brew install go ```

### 1. enable go modules; Ref: https://blog.golang.org/using-go-modules
``` go env -w GO111MODULE=on ```

### 2. fallback option: pull modules from orgin of the source code (e.g., Github) when failing to pull from go modules
``` go env -w GOPROXY=direct ```

### 3. manually fetch all external modules (dependencies) from go.mod
``` go mod download ```

### 3.1 add a new dependency or change the required version of a dependency  
``` go get -u github.com/gin-gonic/gin ```

### (Optional) 3.2 implicitly add new dependencies to go.mod as needed
``` go build ```
``` go test ```

### (Optional) 3.3 clean up unused dependencies:
``` go mod tidy ```

### 4. start docker locally 
``` docker-compose up -d ```

### 5. manually run sql queries in ./sql/schema.sql 

### 6. start app locally
``` go run main.go ```
