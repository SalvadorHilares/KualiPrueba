export class Item {
    constructor(
        public name: string,
        public sellIn: number,
        public quality: number
    ) {}
}

export class GildedRose {
    private static readonly MAX_QUALITY = 50;
    private static readonly MIN_QUALITY = 0;

    constructor(private items: Item[]) {}

    updateQuality(): Item[] {
        return this.items.map(item => {
            this.updateItemQuality(item);
            return item;
        });
    }

    private updateItemQuality(item: Item): void {
        const updateStrategies: Record<string, (item: Item) => void> = {
            "Aged Brie": this.updateAgedBrie.bind(this),
            "Backstage passes to a TAFKAL80ETC concert": this.updateBackstagePass.bind(this),
            "Sulfuras, Hand of Ragnaros": this.updateSulfuras.bind(this)
        };

        const updateStrategy = updateStrategies[item.name] || this.updateGenericItem.bind(this);

        updateStrategy(item);
        this.updateSellIn(item);
        this.handleExpiredItem(item);
    }

    private updateSellIn(item: Item): void {
        if (item.name !== "Sulfuras, Hand of Ragnaros") {
            item.sellIn--;
        }
    }

    private handleExpiredItem(item: Item): void {
        if (item.sellIn < 0) {
            const expiredStrategies: Record<string, (item: Item) => void> = {
                "Aged Brie": this.updateAgedBrie.bind(this),
                "Backstage passes to a TAFKAL80ETC concert": this.resetBackstagePassQuality,
                "Sulfuras, Hand of Ragnaros": this.updateSulfuras.bind(this)
            };

            const expiredStrategy = expiredStrategies[item.name] || this.handleExpiredGenericItem.bind(this);
            expiredStrategy(item);
        }
    }

    private updateAgedBrie(item: Item): void {
        this.incrementQuality(item);
    }

    private updateBackstagePass(item: Item): void {
        if (item.sellIn > 10) {
            this.incrementQuality(item);
        } else if (item.sellIn > 5) {
            this.incrementQuality(item, 2);
        } else if (item.sellIn > 0) {
            this.incrementQuality(item, 3);
        }
    }

    private resetBackstagePassQuality(item: Item): void {
        item.quality = GildedRose.MIN_QUALITY;
    }

    private updateSulfuras(item: Item): void {
        // Sulfuras never changes
    }

    private updateGenericItem(item: Item): void {
        this.decrementQuality(item);
    }

    private handleExpiredGenericItem(item: Item): void {
        this.decrementQuality(item, 2);
    }

    private incrementQuality(item: Item, amount = 1): void {
        item.quality = Math.min(
            GildedRose.MAX_QUALITY,
            item.quality + amount
        );
    }

    private decrementQuality(item: Item, amount = 1): void {
        item.quality = Math.max(
            GildedRose.MIN_QUALITY,
            item.quality - amount
        );
    }
}