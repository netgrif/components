import {MoreThanEqualDateTime} from './more-than-equal-date-time';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';
import {OperatorService} from '../../operator-service/operator.service';

describe('MoreThanEqualDateTime', () => {
  it('should create an instance', () => {
    expect(new MoreThanEqualDateTime(new OperatorService(new OperatorResolverService()))).toBeTruthy();
  });
});
