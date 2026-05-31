import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface IconDefaultPrototype {
  _getIconUrl?: string;
}

delete (
  L.Icon.Default.prototype as typeof L.Icon.Default.prototype &
    IconDefaultPrototype
)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default L;
