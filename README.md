# Eik podlet server extension

This [@podium/podlet-server](https://github.com/podium-lib/podlet-server) extension helps map the asset base to eik when your app is deployed

## Installation

```
npm i @podium/eik-podlet-server-extension
```

## Registration

```json5
{
  // ...
  podium: {
    extensions: {
      "podlet-server": [
        // ...
        "@podium/eik-podlet-server-extension",
        // ...
      ],
    },
  },
  // ...
}
```

## Debug `podlet build`

If you want to use the local files also outside development, for local debugging, run:

```
podlet build
EIK_DEVELOPMENT=true podlet start
```
