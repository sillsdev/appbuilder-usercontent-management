package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

type Manifest struct {
	Files              []string          `json:"files"`
	Languages          []string          `json:"languages"`
	Color              string            `json:"color"`
	Package            string            `json:"package"`
	DownloadApkStrings map[string]string `json:"download-apk-strings"`
	Url                string            `json:"url"`
	DefaultLanguage    string            `json:"default-language"`
	Icon               string            `json:"icon"`
}

type Listing struct {
	Lang             string `json:"lang"`
	Title            string `json:"title"`
	ShortDescription string `json:"shortDescription"`
	FullDescription  string `json:"fullDescription"`
}
type App struct {
	AppId         string    `json:"appId"`
	AppIcon       string    `json:"appIcon"`
	GooglePlayUrl string    `json:"googlePlayUrl"`
	Listings      []Listing `json:"listings"`
}

func downloadManifest(scriptoriaUrl string, productId string, result *Manifest) error {
	manifestUrl := fmt.Sprintf(scriptoriaUrl+"/api/products/%s/files/published/play-listing-manifest", productId)

	resp, err := http.Get(manifestUrl)
	if err != nil {
		panic(err)
	}
	if resp.StatusCode != http.StatusOK {
		panic(resp.Status)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(body, &result)
	if err != nil {
		panic(err)
	}

	return nil
}

func downloadFile(downloadUrl string, result *string) error {
	resp, err := http.Get(downloadUrl)
	if err != nil {
		panic(err)
	}
	if resp.StatusCode != http.StatusOK {
		panic(resp.Status)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	*result = string(body)

	return nil
}

func saveAppToJson(app *App) error {
	f, error := os.Create(app.AppId + ".json")
	if error != nil {
		panic(error)
	}
	defer f.Close()

	jsonBytes, error := json.MarshalIndent(app, "", "  ")
	if error != nil {
		panic(error)
	}

	f.Write(jsonBytes)

	return nil
}

func main() {
	dir, error := os.Getwd()
	if error != nil {
		panic(error)
	}

	envPath := filepath.Join(dir, "../../.env")
	fmt.Println("Env: " + envPath)

	error = godotenv.Load(envPath)
	if error != nil {
		panic(error)
	}

	scriptoriaUrl := os.Getenv("SCRIPTORIA_URL")

	for _, productId := range os.Args[1:] {
		manifest := &Manifest{}
		error := downloadManifest(scriptoriaUrl, productId, manifest)
		if error != nil {
			panic(error)
		}

		listings := []Listing{}
		for _, language := range manifest.Languages {
			listing := &Listing{Lang: language}
			downloadFile(manifest.Url+language+"/full_description.txt", &listing.FullDescription)
			downloadFile(manifest.Url+language+"/short_description.txt", &listing.ShortDescription)
			listings = append(listings, *listing)

		}
		app := &App{AppId: productId, AppIcon: manifest.Url + manifest.Icon, GooglePlayUrl: "https://play.google.com/store/apps/details?id=" + manifest.Package, Listings: listings}
		saveAppToJson(app)
	}
}
