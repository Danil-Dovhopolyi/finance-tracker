import { useState, useCallback, useRef, useEffect } from 'react';

interface UseInfiniteScrollOptions<T> {
    fetchItems: (page: number, itemsPerPage: number) => Promise<T[]>;
    itemsPerPage?: number;
}

export function useInfiniteScroll<T>({
    fetchItems,
    itemsPerPage = 10,
}: UseInfiniteScrollOptions<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const loadMoreItems = useCallback(async () => {
        if (!hasMore || isLoading) return;

        setIsLoading(true);
        try {
            const newItems = await fetchItems(page, itemsPerPage);

            if (newItems.length === 0) {
                setHasMore(false);
            } else {
                setItems((prevItems) => [...prevItems, ...newItems]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setIsLoading(false);
        }
    }, [page, fetchItems, hasMore, isLoading, itemsPerPage]);

    const lastItemRef = useCallback(
        (node: HTMLElement | null) => {
            if (isLoading) return;

            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        loadMoreItems();
                    }
                },
                {
                    root: containerRef.current,
                    threshold: 0.1,
                }
            );

            if (node) observerRef.current.observe(node);
        },
        [isLoading, hasMore, loadMoreItems]
    );

    useEffect(() => {
        loadMoreItems();
    }, []);

    return {
        items,
        containerRef,
        lastItemRef,
        isLoading,
        hasMore,
    };
}
