export function getAssetURL(assetID: string){
    return import.meta.env.VITE_DIRECTUS_ASSETS_URL + 'assets/' + assetID;
}
