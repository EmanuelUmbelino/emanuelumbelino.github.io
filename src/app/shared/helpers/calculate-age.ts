export function CalculateAge (birthDate: Date) {
    birthDate = new Date(birthDate);
    const today = new Date();

    let years = (today.getFullYear() - birthDate.getFullYear());

    if (today.getMonth() < birthDate.getMonth() || 
        today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;
}
