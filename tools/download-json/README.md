# download-json

Download publically accessible metadata from Scriptoria.io to use in testing.

## Prerequisites

Download and install GoLang 1.21 from https://go.dev/dl/

## Usage

```
go run . [<productId>...]
```

Talk to Chris Hubbard to get productIds.

## Example

```
go run . 59706088-a5fd-4552-ad90-d7f0062e1662 bee19c63-820a-4159-afae-dbfbd7a6a0f6 34d70c44-50a8-48dc-9ea7-1ff10a04690e
```

## Output

It will generate a &lt;productId&gt;.json file in the current directory. This can be used with [Advanced REST Client](https://www.advancedrestclient.com/) to send a POST to the API endpoint.
