'use client';

export function useUserInitial(name?: string, email?: string) {
  const fallback = 'G';

  const getInitial = (): string => {
    if (name) return name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return fallback;
  };

  const getAvatarColor = (letter: string): string => {
    const colors = [
      'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600',
      'bg-indigo-600', 'bg-pink-600', 'bg-teal-600', 'bg-cyan-600', 'bg-amber-600',
      'bg-lime-600', 'bg-emerald-600', 'bg-violet-600', 'bg-fuchsia-600', 'bg-rose-600',
    ];
    const index = letter.toUpperCase().charCodeAt(0) - 65;
    return colors[index % colors.length] || 'bg-gray-600';
  };

  const initial = getInitial();
  const avatarColor = getAvatarColor(initial);

  return { initial, avatarColor };
}
