; Script generated by the Inno Script Studio Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "Youtube-Play-With-MPV"
#define MyAppVersion "0.0.1"
#define MyAppExeName "yt-open-in-mpv.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{5F81E2BB-EF83-46B6-A40D-353AAC552758}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
PrivilegesRequired=lowest
DefaultDirName={localappdata}\Programs\ytplaywithmpv
DisableDirPage=yes
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
LicenseFile=..\LICENSE
OutputDir=..\build
OutputBaseFilename=youtube-open-in-mpv-installer-x64
Compression=none
;SolidCompression=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "..\build\node-pkg-binary\yt-open-in-mpv.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\3rd-party-binaries\d3dcompiler_43.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\3rd-party-binaries\mpv.com"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\3rd-party-binaries\mpv.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\3rd-party-binaries\youtube-dl.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\config\input.conf"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\config\net.ccoding.ytplaywithmpv.json"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"

[Registry]
Root: HKCU; Subkey: "Software\Google\Chrome\NativeMessagingHosts\net.ccoding.ytplaywithmpv"; ValueType: string; ValueData: "{localappdata}\Programs\ytplaywithmpv\net.ccoding.ytplaywithmpv.json"; Flags: uninsdeletekey 




