Mean-upload lets you upload multiple files to your mean.io based app and use them.
The package provides a directive called mean-upload which renders the file picker.

### Installation
just go to the root of your meanio site and run:
mean instal mean-upload

### Callbacks
The package provides two callbacks:
uploadFileCallback: Which is fired when ever each file is successfuly uploaded
uploadFinished : Which is fired when All of the files have been uploaded.

### Usage
To use is just integrate the next directive in to your angular view...

```
<mean-upload file-dest="'/packages/files/'"
upload-callback="uploadFinished(files)"
upload-file-callback="uploadFileCallback(file)">
</mean-upload>
<div data-ng-repeat="img in images">
    <img data-ng-src="{{img.src}}" alt="">
</div>
```

### Directive attributes
file-dest = Default destination on server to upload the files to
upload-callback = Default name of all files uploaded callback
upload-file-callback = Default name for each file upload completion
