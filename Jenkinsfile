pipeline {
  agent any
  environment {
        NEXUS_CRED = credentials('1986c778-eba7-44d7-b6f6-71e73906d894')
        packageJson = readJSON(file: 'package.json')
  }
  tools {
    nodejs 'localNodeJS'
  }
  stages {

    stage('Install') {
      steps {
        bitbucketStatusNotify(buildState: 'INPROGRESS')
        echo 'Installing dependencies'
        sh 'npm install'
      }
    }

    stage('Tests') {
      parallel {
        stage('Unit Test') {
          steps {
            echo 'Starting tests using karma and jasmine'
            sh 'npm run ng test netgrif-application-engine'
          }
        }

        stage('Lint') {
          steps {
            echo 'Starting ts-lint'
            sh 'npm run ng lint netgrif-application-engine'
          }
        }
      }
    }

    stage('Sonar') {
        steps {
            echo 'Sent to SonarQube analysis'
            sh 'npm run nae:sonar'
        }
    }

    stage('Build') {
      steps {
        echo 'Starting building NAE library'
        sh 'npm run nae:build'
      }
    }

    stage('Doc') {
      steps {
        echo 'Generating documentation'
        sh 'npm run nae:doc'
      }
    }

    stage('Publish') {
        parallel {
            stage('Publish to Nexus NPM') {
                steps {
                    sh '''
                        echo "npm publishing"
                        mv .npmrc .npmrc_renamed
                        echo "registry=https://nexus.netgrif.com/repository/npm-private/" > .npmrc
                        echo "email=jenkins@netgrif.com" >> .npmrc
                        echo -n "_auth=" >> .npmrc
                        echo -n $NEXUS_CRED | openssl base64 >> .npmrc
                        cat .npmrc
                        npm publish dist/netgrif-application-engine
                        rm .npmrc
                        mv .npmrc_renamed .npmrc
                    '''
                 }
            }

            stage('Publish docs') {
                steps {
                    echo 'Uploading documentation via sshPublisher'
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'developer.netgrif.com',
                                transfers: [
                                    sshTransfer(
                                        cleanRemote: true,
                                        excludes: '',
                                        execCommand: '',
                                        execTimeout: 120000,
                                        flatten: false,
                                        makeEmptyDirs: false,
                                        noDefaultExcludes: false,
                                        patternSeparator: '[, ]+',
                                        remoteDirectory: "/var/www/html/developer/projects/engine-frontend/${env.packageJson.version}",
                                        remoteDirectorySDF: false,
                                        removePrefix: 'docs/compodoc',
                                        sourceFiles: 'docs/compodoc/**')],
                                usePromotionTimestamp: false,
                                useWorkspaceInPromotion: false,
                                verbose: true)])
                }
            }

            stage('Publish test reports') {
                steps {
                    echo 'Uploading test reports via sshPublisher'
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'developer.netgrif.com',
                                transfers: [
                                    sshTransfer(
                                        cleanRemote: true,
                                        excludes: '',
                                        execCommand: '',
                                        execTimeout: 120000,
                                        flatten: false,
                                        makeEmptyDirs: false,
                                        noDefaultExcludes: false,
                                        patternSeparator: '[, ]+',
                                        remoteDirectory: "/var/www/html/developer/projects/engine-frontend/${env.packageJson.version}/coverage",
                                        remoteDirectorySDF: false,
                                        removePrefix: 'coverage/netgrif-application-engine',
                                        sourceFiles: 'coverage/netgrif-application-engine/**')],
                                usePromotionTimestamp: false,
                                useWorkspaceInPromotion: false,
                                verbose: true)])
                }
            }
        }
     }

     stage('Build Examples') {
        steps {
            sh 'npm run nae:local-build && npm run example:build'
        }
     }

     stage('Publish Examples') {
        steps {
            sshPublisher(
                publishers: [
                    sshPublisherDesc(
                        configName: 'developer.netgrif.com',
                        transfers: [
                            sshTransfer(
                                cleanRemote: true,
                                excludes: '',
                                execCommand: '',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: "/var/www/html/developer/projects/engine-frontend/${env.packageJson.version}/examples",
                                remoteDirectorySDF: false,
                                removePrefix: 'dist/nae-example-app',
                                sourceFiles: 'dist/nae-example-app/**')],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true)])
        }
     }
  }

  post {
    always {
        //slackSend channel: '#ops-room',
        //          color: 'good',
        //          message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."

        junit 'coverage/netgrif-application-engine/JUNITX-test-report.xml'
    }

    success {
        bitbucketStatusNotify(buildState: 'SUCCESSFUL')
        zip(archive: true, zipFile: 'nae-frontend-dist.zip', dir: 'dist/netgrif-application-engine')
        // archiveArtifacts artifacts: 'dist/netgrif-application-engine/nae-frontend-dist.zip', fingerprint: true
    }

    unstable {
        bitbucketStatusNotify(buildState: 'SUCCESSFUL')
    }

    failure {
        bitbucketStatusNotify(buildState: 'FAILED')
    }
  }
}
