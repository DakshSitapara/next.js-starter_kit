import CalendarPage from "./CalendarPage.tsx";
import ClientOnly from '@/components/ClientOnly';

export default function Page() {
    return (
        <ClientOnly>
            <CalendarPage />
        </ClientOnly>
    );
}