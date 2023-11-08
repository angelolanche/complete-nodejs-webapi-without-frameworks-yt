export default class HeroService {
  constructor({
    heroRepository
  }) {
    this.heroRepository = heroRepository
  }

  find() {
    return this.heroRepository.find()
  }

  create() {
    return this.heroRepository.create(data)
  }
}
