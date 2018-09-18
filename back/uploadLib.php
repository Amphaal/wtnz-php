<?php

function uploadLib($user_qs) {
    $expectedFilename = 'wtnz_file';

    comparePasswords($user_qs);
    testUploadedFile($expectedFilename);
    testFileCompatibility($expectedFilename);
    processUploadedLib($user_qs, $expectedFilename);
}

function processUploadedLib($user_qs, $expectedFilename) {

    $pathTo = formatUserDataFolder($user_qs) . getCurrentLibraryFileName();
    
    //check for duplicates
    if(isUselessUpload($pathTo, $expectedFilename)) exit("File identical to current, no upload needed.");

    //archive current file if necessary
    archivePreviousUpload($user_qs, $pathTo);

    //move the uploaded file to user's directory
    uploadFile($pathTo, $expectedFilename);

    //specific redirect for headless client
    if(isset($_POST['headless'])) exit('Bon appétit!');
    
    //redirect to users library...
    header("Location: " . dirname($_SERVER['REQUEST_URI']));
    exit();
}

function archivePreviousUpload($user_qs, $pathTo) {
    //ignore if current file doesnt exist
    if(!file_exists($pathTo)) return;

    //copy save
    $archive_dir = filemtime($pathTo).'_'.rand(0,999);
    $copyDestination = formatUserDataFolder($user_qs) . $archive_dir . '/' . basename($pathTo);
    
    //archive...
    if (!mkdir(dirname($copyDestination))) errorOccured('Error while creating archive directory.');
    if (!copy($pathTo, $copyDestination)) errorOccured('Error while copying uploaded file to archive directory.');
}

///
/// UI specifics
///

function routerUploadLib($user_qs, $action) {

    $isAPICall = isset($_POST['headless']);
    if(!$isAPICall) {
        //redirect to upload UI if no library for the user
        $expectedLibrary = formatUserDataFolder($user_qs) . getCurrentLibraryFileName();
        if(!file_exists($expectedLibrary)) return accessManualUploadUI($user_qs);
    }

    //if not asking lib upload, skip for next router
    if($action != 'uploadLib') return;
    
    //check prerequisites
    if(!empty($_POST) && !empty($_FILES)) {
        return uploadLib($user_qs);  
    // if from UI 
    } elseif($isAPICall) {
        errorOccured('Missing arguments');
    } else {
        return accessManualUploadUI($user_qs);
    }

}

function accessManualUploadUI($user_qs) {
    include "back/ui_templates/upload.php";
    exit;
}