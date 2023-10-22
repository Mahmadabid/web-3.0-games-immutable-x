export const CategoryFetcher = async () => {
    const fetchCategory = await fetch('https://opentdb.com/api_category.php');
    const data = await fetchCategory.json()
    return data
}