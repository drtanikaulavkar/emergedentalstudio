import { Background } from '../background/Background';
import { Nav } from '../templates/Nav';
import { Services } from '../templates/Services';

const ServicesPage = () => (
  <Background image>
    <Nav />
    <Services hideMore />
  </Background>
  // <div className="py-16 text-center">WIP: List All Services</div>
);

export default ServicesPage;
