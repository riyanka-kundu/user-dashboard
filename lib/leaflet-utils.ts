import L from "leaflet";

type TNameProp = {
  first_name?: string;
  last_name?: string;
  isLoading?: boolean;
};

export function getInitials({
  first_name,
  last_name,
  isLoading,
}: TNameProp): string {
  if (isLoading) {
    return "YOU";
  }

  const fullName = [first_name, last_name].filter(Boolean).join(" ").trim();

  if (!fullName) {
    return "YOU";
  }

  return fullName
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function createUserAvatarIcon(props: TNameProp) {
  return L.divIcon({
    html: `
      <div class="user-avatar-marker">
        ${getInitials(props)}
      </div>
    `,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
}
