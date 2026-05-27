import React from "react";
import {YStack} from "../../../components/ui";
import {Skeleton, SkeletonText} from "../../../components/skeleton";

export default function ModulesSkeleton() {
  return (
    <YStack flex={1} backgroundColor="white" paddingHorizontal="$4.5" paddingVertical="$4">
      {Array.from({length: 2}).map((_, sectionIndex) => (
        <YStack key={sectionIndex} marginTop="$2" marginBottom="$4">
          <SkeletonText width="62%" height={22} style={{marginTop: 8, marginBottom: 12}}/>
          {Array.from({length: 2}).map((__, itemIndex) => (
            <YStack key={itemIndex} marginBottom="$3">
              <Skeleton width="100%" height={58}/>
            </YStack>
          ))}
        </YStack>
      ))}
    </YStack>
  );
}
