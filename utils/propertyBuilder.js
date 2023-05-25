class PropertyQueryBuilder {
  constructor(builder) {
    this.type = builder?.type;
    this.bedrooms = builder?.bedrooms;
    this.bathrooms = builder?.bathrooms;
    this.parkings = builder?.parkings;
    this.address = builder?.address;
    this.price = builder?.price;
    this.rent = builder?.rent;
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.type;
        this.bedrooms;
        this.bathrooms;
        this.parkings;
        this.address;
      }

      setType(type) {
        if (type) {
          this.type = type;
        }
        return this;
      }
      setBedrooms(bedrooms) {
        if (bedrooms) {
          this.bedrooms = { $gte: +bedrooms };
        }
        return this;
      }
      setBathrooms(bathrooms) {
        if (bathrooms) {
          this.bathrooms = { $gte: +bathrooms };
        }
        return this;
      }
      setParkings(parkings) {
        if (parkings) {
          this.parkings = { $gte: +parkings };
        }
        return this;
      }
      setAddress(address) {
        if (address) {
          const addresses = address.split(' ').join('|');
          this.address = { $regex: addresses, $options: 'i' };
        }
        return this;
      }
      setMinRent(minRent) {
        if (minRent) {
          if (!this.rent) this.rent = {};
          this.rent.$gte = +minRent;
        }
        return this;
      }
      setMaxRent(maxRent) {
        if (maxRent) {
          if (!this.rent) this.rent = {};
          this.rent.$lte = +maxRent;
        }
        return this;
      }
      setMinPrice(minPrice) {
        if (minPrice) {
          if (!this.price) this.price = {};
          this.price.$gte = +minPrice;
        }
        return this;
      }
      setMaxPrice(maxPrice) {
        if (maxPrice) {
          if (!this.price) this.price = {};
          this.price.$lte = +maxPrice;
        }
        return this;
      }
      build() {
        return this;
      }
    }
    return Builder;
  }
}

module.exports = PropertyQueryBuilder;
